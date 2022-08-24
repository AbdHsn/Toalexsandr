using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;
using RepositoryLayer;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

string CorsPolicy = "CorsPolicy";
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddControllers().AddNewtonsoftJson(options =>
           options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
           );
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddHttpContextAccessor();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "NINETRAX", Description = "API End Points Testing UI", Version = "v1" });
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(builder.Configuration.GetSection("Jwt:Key").Value)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
builder.Services.AddCors();

builder.Services.AddDbContext<EntityContext>(options =>
{
    //options.UseSqlServer(builder.Configuration["ConnectionStrings:DefaultConnection"]);
    options.UseMySql(builder.Configuration["ConnectionStrings:DefaultConnection"], ServerVersion.AutoDetect(builder.Configuration["ConnectionStrings:DefaultConnection"]));
});

#region DI
builder.Services.AddSingleton(typeof(IEntityRepo<>), typeof(EntityRepo<>));
builder.Services.AddTransient(typeof(IRawQueryRepo<>), typeof(RawQueryRepo<>));
#endregion

builder.Services.AddCors(options => options.AddPolicy(name: CorsPolicy,
    builder =>
    {
        builder.AllowAnyHeader()
               .AllowAnyMethod()
               .SetIsOriginAllowed((host) => true)
               .WithOrigins(
                                "http://54.175.155.238",
                                "https://54.175.155.238",
                                "http://54.175.155.238:80",
                                "https://54.175.155.238:80",
                                "http://localhost:3000",
                                "https://localhost:3000"
                            )
                           .WithMethods("POST", "GET", "PUT", "DELETE")
                          // .WithHeaders(HeaderNames.ContentType)
                           .AllowCredentials();
    }));



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}
// Order Must be followed.
app.UseCors(CorsPolicy);
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

//app.MapControllerRoute(name: "default",
//    pattern: "{controller=APIWorking}/{action=Get}/{id?}").RequireAuthorization();

app.MapControllers().RequireAuthorization();

app.Run();
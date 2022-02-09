using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;
using RepositoryLayer;

var builder = WebApplication.CreateBuilder(args);
string CorsPolicy = "CorsPolicy";
// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<EntityContext>(options =>
{
    //options.UseSqlServer(builder.Configuration["ConnectionStrings:DefaultConnection"]);
    options.UseMySql(builder.Configuration["ConnectionStrings:DefaultConnection"], ServerVersion.AutoDetect(builder.Configuration["ConnectionStrings:DefaultConnection"]));
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddCors();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "NINETRAX", Description = "API end point testing UI", Version = "v1" });
});

#region DI
builder.Services.AddScoped(typeof(IEntityRepo<>), typeof(EntityRepo<>));
builder.Services.AddScoped(typeof(IRawQueryRepo<>), typeof(RawQueryRepo<>));
#endregion

builder.Services.AddCors(options => options.AddPolicy(name: CorsPolicy,
    builder =>
    {
        builder.AllowAnyHeader()
               .AllowAnyMethod()
               //.SetIsOriginAllowed((host) => true)
               .WithOrigins(
                                "http://54.144.69.10/",
                                "https://54.144.69.10/",
                                "http://54.144.69.10:81",
                                "https://54.144.69.10:81",
                                "http://3.129.206.72",
                                "http://3.129.206.72",
                                "https://3.129.206.72",
                                "http://3.129.206.72:81",
                                "https://3.129.206.72:81",
                                "http://localhost:3000",
                                "https://localhost:3000"
                            ).WithMethods("POST", "GET", "PUT", "DELETE")
                            .WithHeaders(HeaderNames.ContentType)
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

app.UseCors(CorsPolicy);
//app.UseHttpsRedirection();
app.UseAuthorization();
//app.UseEndpoints(endpoints =>
//{
//    endpoints.MapControllers();
//});

app.MapControllerRoute(name: "default",
    pattern: "{controller=APIWorking}/{action=Get}/{id?}");

app.Run();
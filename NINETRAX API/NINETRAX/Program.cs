using Microsoft.EntityFrameworkCore;
using RepositoryLayer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<EntityContext>(options =>
{
    options.UseSqlServer(builder.Configuration["ConnectionStrings:DefaultConnection"]);
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddCors();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

#region DI
builder.Services.AddScoped(typeof(IEntityRepo<>), typeof(EntityRepo<>));
builder.Services.AddScoped(typeof(IRawQueryRepo<>), typeof(RawQueryRepo<>));
#endregion

builder.Services.AddCors(options => options.AddPolicy("CorsPolicy",
    builder =>
    {
        builder.AllowAnyHeader()
               .AllowAnyMethod()
               .SetIsOriginAllowed((host) => true)
               .WithOrigins(
                    "http://adminui.abdullahbinhasan.xyz/",
                    "http://18.130.24.90",
                    "http://localhost:3000",
                    "https://localhost:3000",
                    "http://admin.digitalrideglobal.com",
                    "https://admin.digitalrideglobal.com",
                    "http://ec2-35-178-178-171.eu-west-2.compute.amazonaws.com",
                    "https://ec2-35-178-178-171.eu-west-2.compute.amazonaws.com"
                )
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

app.UseCors(s => s.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllerRoute(name: "default",
    pattern: "{controller=WeatherForecast}/{action=Get}/{id?}");

app.Run();
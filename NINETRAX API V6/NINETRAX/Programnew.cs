//using Microsoft.EntityFrameworkCore;
//using Microsoft.Net.Http.Headers;
//using Microsoft.OpenApi.Models;
//using RepositoryLayer;
//using Swashbuckle.AspNetCore.Filters;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.IdentityModel.Tokens;
//using System.Text;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc.Authorization;

//var builder = WebApplication.CreateBuilder(args);

//string CorsPolicy = "CorsPolicy";
//// Add services to the container.

//builder.Services.AddControllers(options => {
//    //Adding these code to set authorize attribute globally for the controllers
//    var policy = new AuthorizationPolicyBuilder()
//        .RequireAuthenticatedUser()
//        .Build();
//    options.Filters.Add(new AuthorizeFilter(policy));
//});

//builder.Services.AddControllers().AddNewtonsoftJson(options =>
//           options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
//           );
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddHttpContextAccessor();
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddSwaggerGen(options =>
//{
//    options.SwaggerDoc("v1", new OpenApiInfo 
//    { 
//        Title = "NINETRAX", 
//        Description = "REST API End Point Testing UI", 
//        Version = "v1", 
//        //TermsOfService = new Uri("http://54.175.155.238/") 
//    });
//    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
//    {
//        Name = "Authorization",
//        In = ParameterLocation.Header,
//        //Type = SecuritySchemeType.ApiKey,
//        //Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
//        Type = SecuritySchemeType.OAuth2,
//        Flows = new OpenApiOAuthFlows
//        {
//            Implicit = new OpenApiOAuthFlow
//            {
//                Scopes = new Dictionary<string, string>
//                {
//                    { "openid", "Open Id" }
//                },
//                //AuthorizationUrl = new Uri(builder.Configuration.GetSection("Authentication:Domain").Value + "authorize?audience=" + builder.Configuration.GetSection("Authentication:Audience").Value)
//            }
//        }
//    });
//    //options.OperationFilter<SecurityRequirementsOperationFilter>();
//    options.OperationFilter<SecurityRequirementsOperationFilter>();
//});

////.Net Core Default
////builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
////    .AddJwtBearer(options =>
////    {
////        options.TokenValidationParameters = new TokenValidationParameters
////        {
////            ValidateIssuerSigningKey = true,
////            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
////                .GetBytes(builder.Configuration.GetSection("Jwt:Key").Value)),
////            ValidateIssuer = false,
////            ValidateAudience = false
////        };
////    });

//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    options.- = JwtBearerDefaults.AuthenticationScheme;
//}).AddJwtBearer(options =>
//{
//    options.Authority = builder.Configuration.GetSection("Authentication:Domain").Value;//Configuration["Authentication:Domain"];
//    options.Audience = builder.Configuration.GetSection("Authentication:Audience").Value;//Configuration["Authentication:Audience"];
//});


//builder.Services.AddCors();

//builder.Services.AddDbContext<EntityContext>(options =>
//{
//    //options.UseSqlServer(builder.Configuration["ConnectionStrings:DefaultConnection"]);
//    options.UseMySql(builder.Configuration["ConnectionStrings:DefaultConnection"], ServerVersion.AutoDetect(builder.Configuration["ConnectionStrings:DefaultConnection"]));
//});

//#region DI
//builder.Services.AddScoped(typeof(IEntityRepo<>), typeof(EntityRepo<>));
//builder.Services.AddScoped(typeof(IRawQueryRepo<>), typeof(RawQueryRepo<>));
//#endregion

//builder.Services.AddCors(options => options.AddPolicy(name: CorsPolicy,
//    builder =>
//    {
//        builder.AllowAnyHeader()
//               .AllowAnyMethod()
//               .SetIsOriginAllowed((host) => true)
//               .WithOrigins(
//                                "http://54.175.155.238",
//                                "https://54.175.155.238",
//                                "http://54.175.155.238:80",
//                                "https://54.175.155.238:80",
//                                "http://localhost:3000",
//                                "https://localhost:3000"
//                            )
//                           .WithMethods("POST", "GET", "PUT", "DELETE")
//                          // .WithHeaders(HeaderNames.ContentType)
//                           .AllowCredentials();
//    }));



//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI(options =>
//    {
//        options.SwaggerEndpoint("/swagger/v1/swagger.json", "API");
//        options.OAuthClientId(builder.Configuration.GetSection("Authentication:ClientId").Value);
//    });
//    app.UseDeveloperExceptionPage();
//}
//// Order Must be followed.
//app.UseCors(CorsPolicy);
//app.UseHttpsRedirection();
//app.UseAuthentication();
//app.UseAuthorization();

//app.MapControllerRoute(name: "default",
//    pattern: "{controller=APIWorking}/{action=Get}/{id?}");

//app.Run();
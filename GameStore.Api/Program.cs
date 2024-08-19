using GameStore.Api.Data;
using GameStore.Api.Endpoints;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorization();
var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Add the GameStoreContext to the DI container
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                      });
});

// Add authentication services
builder.Services.AddDbContext<GameStoreContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("GameStore")));

var app = builder.Build();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);
// Configure the Minimal API...
app.MapGamesEndpoints();
app.MapGenresEndpoints();
// Use authentication and authorization middleware



await app.MigrateDbAsync();


//app.MapControllers();

await app.RunAsync();
using Microsoft.AspNetCore.Identity;

public class ApplicationDbContextSeed
{
    public static async Task SeedAsync(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        if (!await roleManager.RoleExistsAsync("Admin"))
        {
            await roleManager.CreateAsync(new IdentityRole("Admin"));
        }

        if (!await roleManager.RoleExistsAsync("Guest"))
        {
            await roleManager.CreateAsync(new IdentityRole("Guest"));
        }

        var adminUser = new IdentityUser { UserName = "admin@example.com", Email = "admin@example.com" };
        if (userManager.Users.All(u => u.UserName != adminUser.UserName))
        {
            await userManager.CreateAsync(adminUser, "AdminPassword123!");
            await userManager.AddToRoleAsync(adminUser, "Admin");
        }
    }
}


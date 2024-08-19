using GameStore.Api.Data;
using GameStore.Api.Dtos;
using GameStore.Api.Entities;
using GameStore.Api.Mapping;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LinqKit;

namespace GameStore.Api.Endpoints;

public static class GamesEndpoints
{
    const string GetGameEndpointName = "GetGame";

    public static RouteGroupBuilder MapGamesEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("games")
                       .WithParameterValidation();

        // GET /games/paginated
        group.MapGet("/paginated", async (GameStoreContext dbContext, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 5) =>
        {
            var query = dbContext.Games
                                 .Include(game => game.Genre)
                                 .AsQueryable();

            var totalRecords = await query.CountAsync();
            var games = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var response = new
            {
                CurrentPage = pageNumber,
                PageSize = pageSize,
                TotalCount = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pageSize),
                Data = games.Select(game => game.ToGameSummaryDto())
            };

            return Results.Ok(response);
        }).AllowAnonymous();

        // GET /games/search
        group.MapGet("/search", async (GameStoreContext dbContext, [FromQuery] string search = "", [FromQuery] int? id = null, [FromQuery] string genre = "", [FromQuery] DateOnly? releaseDate = null) =>
        {
            var query = dbContext.Games
                                 .Include(game => game.Genre)
                                 .AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(g => g.Name.Contains(search));
            }

            if (id.HasValue)
            {
                query = query.Where(g => g.Id == id.Value);
            }

            if (!string.IsNullOrEmpty(genre))
            {
                query = query.Where(g => g.Genre != null && g.Genre.Name.Contains(genre));
            }

            if (releaseDate.HasValue)
            {
                query = query.Where(g => g.ReleaseDate == releaseDate.Value);
            }

            var games = await query.ToListAsync();

            if (games.Count == 0)
            {
                return Results.NotFound(new { Message = "This Game Is Not Available On Our Website" });
            }

            var response = new
            {
                Data = games.Select(game => game.ToGameSummaryDto())
            };

            return Results.Ok(response);
        }).AllowAnonymous();

        // GET /games/autocomplete
        group.MapGet("/autocomplete", async (GameStoreContext dbContext, [FromQuery] string term = "") =>
        {
            if (string.IsNullOrEmpty(term))
            {
                return Results.BadRequest(new { Message = "Search term cannot be empty" });
            }

            var suggestions = await dbContext.Games
                                             .Where(g => g.Name.StartsWith(term))
                                             .Select(g => g.Name)
                                             .ToListAsync();

            return Results.Ok(new { Suggestions = suggestions });
        }).AllowAnonymous();

        // GET /games/{id}
        group.MapGet("/{id}", async (int id, GameStoreContext dbContext) =>
        {
            Game? game = await dbContext.Games.FindAsync(id);

            return game is null ?
                Results.NotFound() : Results.Ok(game.ToGameDetailsDto());
        })
        .WithName(GetGameEndpointName);
        //.AllowAnonymous();
    
        // POST /games
        group.MapPost("/", async (CreateGameDto newGame, GameStoreContext dbContext) =>
        {
            Game game = newGame.ToEntity();
            dbContext.Games.Add(game);
            await dbContext.SaveChangesAsync();

            return Results.CreatedAtRoute(
                GetGameEndpointName,
                new { id = game.Id },
                game.ToGameDetailsDto());
        }).RequireAuthorization("AdminPolicy");

        // PUT /games/{id}
        group.MapPut("/{id}", async (int id, UpdateGameDto updatedGame, GameStoreContext dbContext) =>
        {
            var existingGame = await dbContext.Games.FindAsync(id);

            if (existingGame is null)
            {
                return Results.NotFound();
            }

            dbContext.Entry(existingGame)
                     .CurrentValues
                     .SetValues(updatedGame.ToEntity(id));

            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        }).RequireAuthorization("AdminPolicy");

        // DELETE /games/{id}
        group.MapDelete("/{id}", async (int id, GameStoreContext dbContext) =>
        {
            await dbContext.Games
                     .Where(game => game.Id == id)
                     .ExecuteDeleteAsync();

            return Results.NoContent();
        }).RequireAuthorization("AdminPolicy");

        return group;
    }
}

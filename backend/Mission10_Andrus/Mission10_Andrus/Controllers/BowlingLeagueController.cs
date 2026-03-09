using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission10_Andrus.Models;

namespace Mission10_Andrus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BowlingLeagueController : ControllerBase
    {
        // Store the database context
        private readonly BowlingLeagueContext _bowlingContext;
        
        // Constructor that receives the database context through dependency injection
        public BowlingLeagueController(BowlingLeagueContext temp)
        {
            _bowlingContext = temp;
        }

        // Handle GET requests to return the list of selected bowlers
        [HttpGet(Name = "GetBowlers")]
        public IEnumerable<object> Get()
        {
            // Query the database for bowlers on the Marlins or Sharks teams
            var bowlerList = _bowlingContext.Bowlers
                .Include(b => b.Team)
                .Where(b => b.Team != null &&
                           (b.Team.TeamName == "Marlins" || b.Team.TeamName == "Sharks"))
                .Select(b => new
                {
                    BowlerName = b.BowlerFirstName + " " +
                                 (b.BowlerMiddleInit ?? "") + " " +
                                 b.BowlerLastName,
                    TeamName = b.Team.TeamName,
                    Address = b.BowlerAddress,
                    City = b.BowlerCity,
                    State = b.BowlerState,
                    Zip = b.BowlerZip,
                    PhoneNumber = b.BowlerPhoneNumber
                })
                .OrderBy(b => b.TeamName)
                .ThenBy(b => b.BowlerName)
                .ToList();

            return bowlerList;
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using MISA.Web02.Core.Entities;
using MISA.Web02.Core.Interfaces.Infrastructure;
using MISA.Web02.Core.Interfaces.Services;

namespace Misa.Web02.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionsController : MisaBaseController<Position>
    {
        IPositionRepository _positionRepository;
        IPositionService _positionService;

        public PositionsController(IPositionRepository positionRepository, IPositionService positionService) : base(positionRepository, positionService)
        {
            _positionRepository = positionRepository;
            _positionService = positionService;
        }
    }
}

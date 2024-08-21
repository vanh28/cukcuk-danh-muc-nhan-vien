using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Web02.Core.Entities;
using MISA.Web02.Core.Interfaces.Infrastructure;
using MISA.Web02.Core.Interfaces.Services;

namespace MISA.Web02.Core.Services
{
    public class PositionService :BaseService<Position>, IPositionService
    {
        IPositionRepository _positionRepository;
        public PositionService(IPositionRepository positionRepository) : base(positionRepository)
        {
            _positionRepository = positionRepository;
        }
    }
}

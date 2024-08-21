using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Web02.Core.Entities;

namespace MISA.Web02.Core.Interfaces.Services
{
    public interface IBaseService<MISAEntity>
    {
        int InsertService(MISAEntity entity);
        int UpdateService(MISAEntity entity, Guid entityId);
    }
}

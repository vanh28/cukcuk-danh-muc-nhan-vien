using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Web02.Core.Interfaces.Infrastructure
{
    public interface IBaseRepository<MISAEntity>
    {
        IEnumerable<MISAEntity> GetAll();
        int Insert(MISAEntity entity);
        int Update(MISAEntity entity, Guid entityId);
        int Delete(Guid entityId);
    }
}

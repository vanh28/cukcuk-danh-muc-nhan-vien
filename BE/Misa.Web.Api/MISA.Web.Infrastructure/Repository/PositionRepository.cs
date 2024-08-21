using MISA.Web02.Core.Entities;
using MISA.Web02.Core.Interfaces.Infrastructure;

namespace MISA.Web02.Infrastructure.Repository
{
    public class PositionRepository:BaseRepository<Position>, IPositionRepository
    {
        /// <summary>
        /// Lấy tất cả các vị trí từ cơ sở dữ liệu.
        /// </summary>
        /// <returns>Một danh sách các đối tượng Position</returns>
        /// <created by>Hoàng Việt Anh</created>
        public IEnumerable<Position> GetAll()
        {
            return GetAll<Position>();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Web02.Core.MisaAttribute;

namespace MISA.Web02.Core.Entities
{
    public class Position
    {
        [PrimaryKey]
        public Guid PositionId { get; set; }
        [NotEmpty]
        [PropName("Tên vị trí")]
        public string PositionName { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Web02.Core.MisaAttribute
{
    // Thuộc tính NotEmpty
    [AttributeUsage(AttributeTargets.Property)]
    public class NotEmpty : Attribute
    {
    }

    // Gán tên cho thuộc tính
    [AttributeUsage(AttributeTargets.Property)]
    public class PropName : Attribute
    {
        public string Name;
        public PropName(string name)
        {
            Name = name;
        }

    }

    // Thuộc tính PrimaryKey
    [AttributeUsage(AttributeTargets.Property)]
    public class PrimaryKey : Attribute { }

}

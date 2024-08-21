using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Web02.Core.Exceptions
{
    public class MisaValidateException:Exception
    {
        string? MsgErrValidate = null;
        public MisaValidateException(string msg)
        {
            this.MsgErrValidate = msg;
        }
        public override string Message
        {
            get
            {
                return MsgErrValidate;
            }
        }
    }
}

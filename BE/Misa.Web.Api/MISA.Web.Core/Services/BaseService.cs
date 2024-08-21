using MISA.Web02.Core.Exceptions;
using MISA.Web02.Core.Interfaces.Infrastructure;
using MISA.Web02.Core.Interfaces.Services;
using MISA.Web02.Core.MisaAttribute;

namespace MISA.Web02.Core.Services
{
    public class BaseService<MISAEntity> : IBaseService<MISAEntity>
    {
        IBaseRepository<MISAEntity> _baseRepository;
        public BaseService(IBaseRepository<MISAEntity> baseRepository)
        {
            _baseRepository = baseRepository;
        }
        public int InsertService(MISAEntity entity)
        {
            //Kiểm tra thuộc tính của đối tượng
            ValidateRequiredFields(entity);
            //Kiểm tra thuộc tính của đối tượng khi đối tượng là Employee
            ValidateEmployeeData(entity);
            var result = _baseRepository.Insert(entity);
            return result;
        }

        public int UpdateService(MISAEntity entity, Guid entityId)
        {
            var result = _baseRepository.Update(entity, entityId);
            return result;
        }

        /// <summary>
        /// Kiểm tra các thuộc tính của đối tượng không bị bỏ trống.
        /// </summary>
        /// <param name="entity">Đối tượng cần kiểm tra.</param>
        /// <createdby>Hoàng Việt Anh</createdby>
        public void ValidateRequiredFields(MISAEntity entity)
        {
            var props = entity.GetType().GetProperties();
            var propNotEmp = entity.GetType().GetProperties().Where(p => Attribute.IsDefined(p, typeof(NotEmpty)));
            foreach (var prop in propNotEmp)
            {
                var propVal = prop.GetValue(entity);
                var propName = prop.Name;
                var nameDisplay = string.Empty;
                var propNames = prop.GetCustomAttributes(typeof(PropName), true);
                if (propNames.Length > 0)
                {
                    nameDisplay = (propNames[0] as PropName).Name;
                }
                if (propVal == null || string.IsNullOrEmpty(propVal.ToString()))
                {
                    nameDisplay = (nameDisplay == string.Empty ? propName : nameDisplay);
                    throw new MisaValidateException(string.Format(Core.Resources.ResourceVN.InfoNotEmpty, nameDisplay));
                }
            }
        }

        // Hàm này sẽ được overide lại khi entity là employee
        protected virtual void ValidateEmployeeData(MISAEntity entity)
        {
        }
    }
}

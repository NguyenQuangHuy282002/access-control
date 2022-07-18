import { yupResolver } from '@hookform/resolvers/yup';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Button, CircularProgress } from '@mui/material';
import InputFieldMui from 'components/form-controls/InputFieldMui';
import InputPassword from 'components/form-controls/InputPassword';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import './styles.scss';

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

function LoginForm({handleSubmit, handleRegister}) {
  const schema = yup.object({
    username: yup.string().required('Địa chỉ email không được bỏ trống'),
    password: yup.string().required('Mật khẩu không được bỏ trống'),
  });

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = async (val) => {
    if (handleSubmit) {
      await handleSubmit(val);
    }
  };
  const { isSubmitting } = form.formState;


  return (
    <div className="login">
      <Avatar className="login__avatar">
        <LockOutlined></LockOutlined>
      </Avatar>
      <div className='login__title'>Đăng nhập</div>
      <form onSubmit={form.handleSubmit(handleSubmitForm)}>
        <InputFieldMui name="username" form={form} label="Tài khoản" />
        <InputPassword name="password" form={form} label="Mật khẩu" />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          className="login__btn"
        >
          ĐĂNG NHẬP
          {isSubmitting && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;

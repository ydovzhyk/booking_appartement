import { IAuthUserData } from '@/types/auth/auth';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login, register } from '../../../redux/auth/auth-operations';
import { AppDispatch } from '../../../redux/store';
import loadAvatar from '../../../utils/helpers/load-avatar';
import { useTranslate } from '../../../utils/helpers/translating/translating';
import Button from '../button/button';
import HumanVerification from '../humanVerification/HumanVerification';
import { fields } from '../text-field/fields';
import TextField from '../text-field/text-field';

interface AuthInputFormProps {
  typeOperation: 'register' | 'login';
}

const AuthInputForm = ({ typeOperation }: AuthInputFormProps) => {
  const dispatch: AppDispatch = useDispatch();
  const pathname = usePathname();
  const [isHumanVerified, setIsHumanVerified] = useState(false);
  const btnText = useTranslate(pathname === '/login' ? 'Login' : 'Register');

  const { control, handleSubmit, reset } = useForm<IAuthUserData>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: IAuthUserData) => {
    if (typeOperation === 'register') {
      const userAvatar = await loadAvatar();
      const userData = { ...data, userAvatar };
      dispatch(register(userData));
    } else {
      const userData = { email: data.email, password: data.password };
      dispatch(login(userData));
    }
    reset();
  };

  const handleVerification = (isVerified: boolean) => {
    setIsHumanVerified(isVerified);
  };

  return (
    <form
      className="flex flex-col justify-center items-center gap-[15px] w-[240px] tablet:gap-0 tablet:w-[300px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      {typeOperation === 'register' && (
        <Controller
          control={control}
          name="username"
          rules={{
            required: 'User name is required',
            minLength: {
              value: 2,
              message: 'Name must have at least 2 characters',
            },
            maxLength: {
              value: 15,
              message: 'Name must have no more than 15 characters',
            },
          }}
          render={({ field: { onChange, value }, fieldState }) => (
            <TextField
              value={value}
              handleChange={onChange}
              error={fieldState.error}
              autoComplete="off"
              {...fields.username}
            />
          )}
        />
      )}
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <TextField
            value={value}
            handleChange={onChange}
            error={fieldState.error}
            {...fields.email}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must have at least 8 characters',
          },
          maxLength: {
            value: 20,
            message: 'Password must have no more than 20 characters',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <TextField
            value={value}
            handleChange={onChange}
            error={fieldState.error}
            autoComplete="current-password"
            {...fields.password}
          />
        )}
      />
      <div className="mb-[20px]">
        <HumanVerification onVerify={handleVerification} />
      </div>
      <div className="w-full flex flex-row items-center justify-center">
        <Button
          text={btnText}
          btnClass={isHumanVerified ? 'btnDark' : 'btnDisabled'}
          disabled={isHumanVerified ? false : true}
        />
      </div>
    </form>
  );
};

export default AuthInputForm;

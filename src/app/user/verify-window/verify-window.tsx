'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { IVerifyEmailData } from '@/types/auth/auth';
import Text from '@/components/shared/text/text';
import Button from '@/components/shared/button/button';
import TextField from '@/components/shared/text-field/text-field';
import { fields } from '@/components/shared/text-field/fields';
import { getUser } from '@/redux/auth/auth-selectors';
import { TfiClose } from 'react-icons/tfi';
import { useAppDispatch } from '../../../utils/helpers/hooks';
import { verifyEmail } from '@/redux/auth/auth-operations';
import { useTranslate } from '@/utils/helpers/translating/translating';

interface VerifyWindowProps {
  onClose: () => void;
}

const VerifyWindow = ({ onClose }: VerifyWindowProps) => {
  const user = useSelector(getUser);
  const dispatch = useAppDispatch();
  const [currentOrigin, setCurrentOrigin] = useState('');
  const [fileLogo, setFileLogo] = useState<File | null>(null);

  const title = useTranslate('Email verification on the GOHome website.');
  const text = useTranslate(
    `Follow the link to confirm your email.`
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentOrigin(encodeURIComponent(window.location.origin));
    }

    async function loadLogo() {
      try {
        const res = await fetch('/api/getLogo');
        if (!res.ok) throw new Error('Failed to fetch logo');
        
        const blob = await res.blob();
        const file = new File([blob], 'logo.png', { type: blob.type });

        setFileLogo(file);
      } catch (err) {
        console.error('Error loading logo:', err);
      }
    }
    loadLogo();
  }, []);

  const { control, handleSubmit, reset } = useForm<IVerifyEmailData>({
    defaultValues: {
      email: user.email || '',
    },
  });

  const onSubmit = async (data: IVerifyEmailData) => {

    const message = {text, title};
    const dataForUpload = new FormData();
    dataForUpload.append('email', data.email);
    dataForUpload.append('location', currentOrigin);  
    dataForUpload.append('message', JSON.stringify(message));
    if (fileLogo) {
      dataForUpload.append('file', fileLogo);
    } else {
      console.error('Logo file is not loaded yet.');
    }

    dispatch(verifyEmail(dataForUpload));
    reset();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white flex flex-col flex-grow justify-between rounded-[5px] p-6 max-w-[80%] w-[80%] h-[80%] md:max-w-[70%] md:w-[70%] md:h-[70%] overflow-y-auto">
        <button
          className="absolute top-[15px] right-[15px] w-[40px] h-[40px] flex flex-row items-center justify-center outline-none hover:border hover:border-[var(--accent-background)] hover:rounded-full p-1 transition duration-300"
          onClick={onClose}
        >
          <TfiClose color="#0f1d2d" size={20} />
        </button>
        <Text>Confirm your email address</Text>
        <Text type="regular" as="span" fontWeight="medium">
          Why is this necessary?
        </Text>
        <Text type="regular" as="span" fontWeight="light">
          Confirm your email address to gain access to adding your apartments.
          This is a mandatory requirement for using the Appartement Booking
          website.
        </Text>
        <Text type="regular" as="span" fontWeight="light">
          Your email address will not be visible to other users on Appartement
          Booking.
        </Text>
        <div className="flex flex-col gap-[10px]">
          <Text type="regular" as="span" fontWeight="medium">
            How to do it:
          </Text>
          <Text type="regular" as="span" fontWeight="light">
            1. Click the "Confirm" button. A link will be sent to your email
            address.
          </Text>
          <Text type="regular" as="span" fontWeight="light">
            2. Follow the link you received in the email.
          </Text>
        </div>
        <Text type="regular" as="span" fontWeight="medium">
          Important! The link is valid for 10 minutes from the time it was
          generated.
        </Text>
        <div className="flex flex-col gap-[30px] mt-[20px]">
          <Text type="regular" as="span" fontWeight="medium">
            You can change your email address if necessary.
          </Text>
          <form
            className="flex flex-row items-start gap-[40px] w-[600px] mb-[-30px]"
            onSubmit={handleSubmit(onSubmit)}
          >
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
            <div className="col-span-full flex justify-center">
              <Button text="Confirm" btnClass="btnDark" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyWindow;

'use client';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import useLoginRegisterModal from '@/app/hooks/useLoginRegisterModal';
import {useRouter} from "next/navigation"
const LoginRegisterModal = () => {
  const loginRegisterModal = useLoginRegisterModal()
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const { modal } = loginRegisterModal;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues:
      modal === 'register'
        ? {
            name: '',
            email: '',
            password: '',
          }
        : {
            email: '',
            password: '',
          },
  });


  const content =
    modal === 'register'
      ? {
          modalTitle: 'Register',
          title: 'Welcome to hotels',
          subtitle: 'Create an account',
          footerTitle: 'Already have an account?',
          footerSubtitle: 'Log in',
        }
      : {
          modalTitle: 'Log in',
          title: 'Welcome back',
          subtitle: 'Log in to your account',
          footerTitle: "Don't have an account?",
          footerSubtitle: 'Register',
        };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (modal==="register") {
      axios
        .post('/api/register', data)
      .then(() => {
        loginRegisterModal.onClose();
        loginRegisterModal.onOpen("login")
      })
      .catch((err) => toast.error('Something goes wrong'))
      .finally(() => setIsLoading(false));
    } else {
         signIn('credentials', { ...data, redirect: false }).then(
           (callback) => {
             setIsLoading(false);
             if (callback?.ok) {
               toast.success('Logged in');
               router.refresh();
               loginRegisterModal.onClose();
             }
             if (callback?.error) {
               toast.error(callback.error);
             }
           }
         );
    }
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title={content.title} subtitle={content.subtitle} center />
     { modal === "register" && <Input
        id="name"
        label="Namel"
        type="text"
        register={register}
        errors={errors}
        required
      />}
      <Input
        id="email"
        label="Email"
        type="email"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        onClick={() => {
          signIn('google');
        }}
        outline
        label="Continue with Google"
        icon={FcGoogle}
      />
      <Button
        onClick={() => {
          signIn('github');
        }}
        outline
        label="Continue with Github"
        icon={AiFillGithub}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>{content.footerTitle}</div>
          <div
            onClick={()=>modal === "register" ? loginRegisterModal.switchModals("login") : loginRegisterModal.switchModals("register")}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {content.footerSubtitle}
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginRegisterModal.isOpen}
      title={content.modalTitle}
      actionLabel="Continue"
      onClose={loginRegisterModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginRegisterModal;

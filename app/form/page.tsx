'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

function Form() {
  const form = useForm<FormValues>({
    defaultValues: {
      username: 'Shiva',
    },
  });
  const { register, control, handleSubmit, formState } = form;

  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log('form submiited', data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          {'Username:  '}
          <input
            type='text'
            id='username'
            {...register('username', {
              validate: (fieldValue) => {
                if (fieldValue === '') {
                  return 'Username is required';
                } else if (fieldValue.length <= 3) {
                  return 'Username should be greater than 3 characters';
                }
              },
            })}
          />
          <p className='text-[red]'>{errors.username?.message}</p>
        </div>
        <div>
          {'Email: '}
          <input
            type='text'
            id='email'
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/,
                message: 'Invalid email',
              },
            })}
          />
          <p className='text-[#ff3434]'>{errors.email?.message}</p>
        </div>
        <div>
          {'channel: '}
          <input type='text' id='channel' {...register('channel')} />
          <p className='text-[#ff3434]'>{errors.channel?.message}</p>
        </div>
        <button>submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default Form;

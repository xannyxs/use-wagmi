import { useMutation } from 'vue-query'
import { signMessage } from '@wagmi/core'

import type { SignMessageArgs, SignMessageResult } from '@wagmi/core'
import type { MutationConfig, DeepMaybeRef } from './../../types'

export type UseSignMessageArgs = DeepMaybeRef<Partial<SignMessageArgs>>

export type UseSignMessageConfig = MutationConfig<
  SignMessageResult,
  Error,
  SignMessageArgs
>

export const mutationKey = (args: UseSignMessageArgs) =>
  [{ entity: 'signMessage', ...args }] as const

const mutationFn = (args: SignMessageArgs) => {
  const { message } = args
  if (!message) throw new Error('message is required')
  return signMessage({ message })
}

export function useSignMessage ({
  message,
  onError,
  onMutate,
  onSettled,
  onSuccess
}: UseSignMessageArgs & UseSignMessageConfig = {}) {
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables
  } = useMutation(
    mutationKey({ message }),
    mutationFn,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess
    }
  )

  const signMessage = (args?: UseSignMessageArgs) => {
    return mutate({
      message: args?.message ?? message
    } as SignMessageArgs)
  }

  const signMessageAsync = (args?: UseSignMessageArgs) => {
    return mutateAsync({
      message: args?.message ?? message
    } as SignMessageArgs)
  }

  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    signMessage,
    signMessageAsync,
    status,
    variables
  }
}
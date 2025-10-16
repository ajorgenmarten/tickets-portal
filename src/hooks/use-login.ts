import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { httpClient } from "@/configs/axios";
import { toast } from 'react-toastify';
import { useAuthContext } from '@/contexts/auth.context';
import { useNavigate } from 'react-router';

const schemaValidation = z.object({
  username: z.string().min(3),
  password: z.string().min(1)
})

export function useLogin() {
  const { setMe, setToken } = useAuthContext()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState,
  } = useForm({
    resolver: zodResolver(schemaValidation),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const onSubmit = handleSubmit(async (loginPayload) => {
    const { data } = await httpClient.post('login', loginPayload);
    const { data: responseData } = data;
    if (data.success === true) {
      setMe(responseData.user)
      setToken(responseData.token)
      toast.success(`Bienvenido ${responseData.user.username}`)
      return navigate('/')
    } else if (data.success === false) {
      toast.error(data.message)
    }
  })

  return { onSubmit, handleSubmit, formState, register }
}

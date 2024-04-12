export interface LoginData{
  email:string,
  password:string
}

export interface LoginResponseData{
  msg:string,
  status: number,
  token: string
}

export interface signupData{
  email:string,
  gender:string,
  name:string,
  number:number,
  password:string
}

export interface SignUpResponseData{
  status:number,
  msg:string
}

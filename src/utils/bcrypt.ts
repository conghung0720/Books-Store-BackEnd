import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltOrRounds);
};

export const isMatchHashPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

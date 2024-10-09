export const formatEmailAddress = (value: string) => {
  return value.replace(/[<()>]/g, "");
};

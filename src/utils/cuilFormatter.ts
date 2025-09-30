export const removeCuitDashes = (cuit: string): string => {
  if (!cuit) return "";
  return cuit.replace(/-/g, "");
};

export const extractDniFromCuit = (cuil: string): string => {
  if (!cuil) return "";

  const cleanCuit = cuil.replace(/[-\s]/g, "");

  if (cleanCuit.length !== 11) return "";

  const dni = cleanCuit.substring(2, 10);

  return dni;
};

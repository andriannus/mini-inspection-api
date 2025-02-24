export type UploadFile = {
  custom_name: string;
  name: string;
};

export type UploadQuery = {
  limit: string;
  end_date?: string;
  start_date?: string;
  page: string;
};

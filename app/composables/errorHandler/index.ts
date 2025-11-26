export const useErrorHadler = () => {
  const notify = useNotification();

  return {
    handle(e: unknown) {
      console.error(e);
      const { data: { message } = {} } = e as {
        status: number;
        data: { message: string };
      };

      if (message) {
        notify.error({
          message,
          timeout: false,
        });
      }
    },
  };
};

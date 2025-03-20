const AuthFooter = () => {
  return (
    <footer className='flex gap-4 text-sm text-gray-600'>
      <a href='#' className='underline underline-offset-2'>
        Privacy Policy
      </a>
      <p>&#x2022;</p>
      <a href='#' className='underline underline-offset-2'>
        Use policy
      </a>
      <p>&#x2022;</p>
      <a
        href='https://github.com/wloszynskiszymon'
        className='underline underline-offset-2'
      >
        GitHub
      </a>
    </footer>
  );
};

export default AuthFooter;

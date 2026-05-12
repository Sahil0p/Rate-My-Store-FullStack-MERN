export default function Footer() {
    return (
      <footer className="w-full border-t bg-gray-100 dark:bg-gray-900
                         text-gray-600 dark:text-gray-400
                         py-4 text-center text-sm">
        © {new Date().getFullYear()} RateMyStore — Built with ❤️
      </footer>
    );
  }
  
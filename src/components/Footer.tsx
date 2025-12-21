const Footer = () => {
  return (
    <footer className="py-6 border-t border-border/40 bg-transparent">
      <div className="px-6 md:px-12 lg:px-20 text-center">
        <p className="text-sm font-medium text-foreground">
          Dhruv Bajaj
        </p>
        <p className="text-xs text-muted-foreground mt-1">
           Web Developer • Software Engineer
        </p>
        <p className="text-xs text-muted-foreground/60 mt-3">
          © {new Date().getFullYear()} Dhruv Bajaj. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import Link from "next/link";

// TODO: underline the current page

const Navbar = () => {
  return (
    <>
      <header className="bg-slate-800 h-[5rem] flex justify-between items-center px-[1rem]">
        <div className="flex items-center gap-8 font-bold text-white">
          <div className="size-10 bg-yellow-500"></div>
          <Link href="/">Home</Link>
          <Link href="/courses/english-us">Courses</Link>
          {/* <Link href="/groups">Groups</Link> */}
        </div>
        <div className="rounded-full size-10 bg-yellow-500"></div>
      </header>
    </>
  );
};

export default Navbar;

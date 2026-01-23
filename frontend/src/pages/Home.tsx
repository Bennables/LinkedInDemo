
export default function SixSquareGrid() {
  const squares = ["hires", "departments", "tasks", "email-bodies"]

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center w-full bg-slate-900 text-slate-100">
        <h1 className="text-lg font-semibold"></h1>
        <p className="text-8xl text-slate-400 pb-30">
         HEY, WELCOME IN
        </p>
        <div className=" grid grid-cols-4 gap-x-9">
        {squares.map((s) => (
            <a href={`/${s}`}>
                <div
                key={s} 
                className="aspect-square rounded-2xl w-40 bg-white/5 ring-1 ring-white/10 shadow-sm flex items-center justify-center"
                >

                
                <span className="text-sm text-slate-300">{s}</span>
                </div>
            </a>
        ))}
        </div>
    </div>

  );
}

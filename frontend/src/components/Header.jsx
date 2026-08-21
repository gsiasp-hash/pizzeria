import heroImg from "../assets/img/Header.jpg";

export default function Header() {
  return (
    <section className="relative flex h-80 w-full flex-col items-center justify-center overflow-hidden sm:h-96">
      <img
        src={heroImg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-tomato-900/85 via-tomato-700/65 to-cheese-500/55" />
      <div className="relative z-10 flex flex-col items-center gap-3 px-4 text-center text-cream-50">
        <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-sm sm:text-5xl">
          ¡Pizzería Gino!
        </h1>
        <p className="max-w-xl text-base font-semibold text-cream-100 sm:text-lg">
          ¡Tenemos las mejores pizzas que podrás encontrar!
        </p>
        <span className="mt-1 h-1 w-24 rounded-full bg-cheese-400" />
      </div>
    </section>
  );
}

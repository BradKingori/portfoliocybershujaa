import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import  Card  from "../components/Card";
import HeroCarousel from "../components/HeroCarousel";
import Projects from "./projects";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bradley Portfolio React Router App" },
    { name: "description", content: "Welcome to Bradley's Portfolio in React Router!" },
  ];
}


export default function Home() {

  return (
<Projects/>
  );
}
import { motion } from "framer-motion";
import Link from "next/link";

export default function GradientButton({
  label,
  link,
}: {
  link: string;
  label: string;
}) {
  return (
    <motion.div
      className="relative inline-block rounded-full p-[3px]"
      style={{
        background:
          "linear-gradient(120deg, #00c6ff, #7b2ff7, #00c6ff)",
        backgroundSize: "300% 300%",
        filter: "saturate(1.4)",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        scale: 1,
      }}
      whileHover={{
        scale: 1.05,
      }}
      transition={{
        backgroundPosition: {
          duration: 2.5,
          repeat: Infinity,
          ease: "linear",
        },
        scale: {
          type: "spring",
          stiffness: 200,
          damping: 15,
        },
      }}
    >
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-6 py-2 text-sm font-bold rounded-full bg-[#f1f9ff] text-zinc-800"
      >
        {label}
      </Link>
    </motion.div>
  );
}

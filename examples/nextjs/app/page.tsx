import { cls } from "cls-extended/api";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className={cls(
        "flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black",
      )}
    >
      <main
        className={cls(
          "flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black",
          {
            sm: "items-start",
            md: "max-w-3xl",
          },
        )}
      >
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div
          className={cls("flex flex-col items-center gap-6 text-center", {
            sm: "items-start text-left",
          })}
        >
          <h1
            className={cls(
              "max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50",
            )}
          >
            cls-extended with Next.js
          </h1>
          <p
            className={cls(
              "max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400",
            )}
          >
            This example demonstrates the cls-extended plugin working with
            Next.js and Webpack. The responsive classes are transformed at build
            time with zero runtime overhead.
          </p>
        </div>
        <div
          className={cls("flex flex-col gap-4 text-base font-medium", {
            sm: "flex-row",
          })}
        >
          <a
            className={cls(
              "flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]",
              {
                md: "w-[158px]",
              },
            )}
            href="https://github.com/yeasin2002/cls-extended-protoype"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
          <a
            className={cls(
              "flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a]",
              {
                md: "w-[158px]",
              },
            )}
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}

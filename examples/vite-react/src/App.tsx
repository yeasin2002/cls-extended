import { cls } from "cls-extended";

const App = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header
        className={cls("bg-white shadow-md", {
          md: "shadow-lg",
        })}
      >
        <nav
          className={cls("container mx-auto px-4 py-4", {
            md: "px-6 py-6",
            lg: "px-8",
          })}
        >
          <div className="flex items-center justify-between">
            <h1
              className={cls("text-2xl font-bold text-indigo-600 ", {
                md: "text-3xl",
                lg: "text-4xl text-amber-100",
              })}
            >
              cls-extended
            </h1>
            <div className="flex gap-4">
              <button
                className={cls(
                  "px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800",
                  {
                    md: "px-6 py-2 text-base",
                  },
                )}
              >
                Docs
              </button>
              <button
                className={cls(
                  "px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700",
                  {
                    md: "px-6 py-2 text-base",
                  },
                )}
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main
        className={cls("container mx-auto px-4 py-12", {
          md: "px-6 py-16",
          lg: "px-8 py-24",
        })}
      >
        <div className="text-center">
          <h2
            className={cls("text-4xl font-extrabold text-gray-900 mb-4", {
              md: "text-5xl mb-6",
              lg: "text-6xl mb-8",
            })}
          >
            Zero-Runtime Tailwind CSS
          </h2>
          <p
            className={cls("text-lg text-gray-600 mb-8", {
              md: "text-xl mb-10",
              lg: "text-2xl mb-12",
            })}
          >
            Transform responsive classes at build time with better DX
          </p>

          {/* Code Example */}
          <div
            className={cls(
              "bg-gray-900 text-white rounded-lg p-6 text-left max-w-2xl mx-auto",
              {
                md: "p-8",
                lg: "p-10 max-w-3xl",
              },
            )}
          >
            <div className="font-mono text-sm">
              <div className="text-gray-400">// Write this:</div>
              <div className="text-green-400 mt-2">
                tw(<span className="text-yellow-300">'text-xl font-bold'</span>,{" "}
                {"{"}
              </div>
              <div className="text-green-400 ml-4">
                md: <span className="text-yellow-300">'text-2xl'</span>,
              </div>
              <div className="text-green-400 ml-4">
                lg: <span className="text-yellow-300">'text-3xl'</span>
              </div>
              <div className="text-green-400">{"}"});</div>
              <div className="text-gray-400 mt-4">
                // Get this at build time:
              </div>
              <div className="text-blue-400 mt-2">
                "
                <span className="text-yellow-300">
                  text-xl font-bold md:text-2xl lg:text-3xl
                </span>
                "
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div
          className={cls("grid grid-cols-1 gap-6 mt-16", {
            md: "grid-cols-2 gap-8 mt-20",
            lg: "grid-cols-3 gap-10 mt-24",
          })}
        >
          {/* Feature 1 */}
          <div
            className={cls("bg-white rounded-lg shadow-md p-6", {
              md: "p-8",
              lg: "p-10 hover:shadow-xl transition-shadow",
            })}
          >
            <div
              className={cls("text-3xl mb-4", {
                md: "text-4xl mb-6",
              })}
            >
              ⚡
            </div>
            <h3
              className={cls("text-xl font-bold text-gray-900 mb-2", {
                md: "text-2xl mb-3",
              })}
            >
              Zero Runtime
            </h3>
            <p
              className={cls("text-gray-600", {
                md: "text-lg",
              })}
            >
              All transformations happen at build time. No JavaScript added to
              your bundle.
            </p>
          </div>

          {/* Feature 2 */}
          <div
            className={cls("bg-white rounded-lg shadow-md p-6", {
              md: "p-8",
              lg: "p-10 hover:shadow-xl transition-shadow",
            })}
          >
            <div
              className={cls("text-3xl mb-4", {
                md: "text-4xl mb-6",
              })}
            >
              🎨
            </div>
            <h3
              className={cls("text-xl font-bold text-gray-900 mb-2", {
                md: "text-2xl mb-3",
              })}
            >
              Better DX
            </h3>
            <p
              className={cls("text-gray-600", {
                md: "text-lg",
              })}
            >
              Cleaner, more maintainable responsive class syntax that's easier
              to read.
            </p>
          </div>

          {/* Feature 3 */}
          <div
            className={cls("bg-white rounded-lg shadow-md p-6", {
              md: "p-8",
              lg: "p-10 hover:shadow-xl transition-shadow",
            })}
          >
            <div
              className={cls("text-3xl mb-4", {
                md: "text-4xl mb-6",
              })}
            >
              🔧
            </div>
            <h3
              className={cls("text-xl font-bold text-gray-900 mb-2", {
                md: "text-2xl mb-3",
              })}
            >
              Universal
            </h3>
            <p
              className={cls("text-gray-600", {
                md: "text-lg",
              })}
            >
              Works with Vite, Webpack, Rollup, esbuild, Rspack, Rolldown, and
              Farm.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={cls("text-center mt-16", {
            md: "mt-20",
            lg: "mt-24",
          })}
        >
          <h3
            className={cls("text-2xl font-bold text-gray-900 mb-4", {
              md: "text-3xl mb-6",
              lg: "text-4xl mb-8",
            })}
          >
            Ready to get started?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className={cls(
                "px-6 py-3 text-base font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700",
                {
                  md: "px-8 py-4 text-lg",
                },
              )}
            >
              Install Now
            </button>
            <button
              className={cls(
                "px-6 py-3 text-base font-medium border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50",
                {
                  md: "px-8 py-4 text-lg",
                },
              )}
            >
              View on GitHub
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={cls("bg-gray-900 text-white mt-16", {
          md: "mt-20",
          lg: "mt-24",
        })}
      >
        <div
          className={cls("container mx-auto px-4 py-8 text-center", {
            md: "px-6 py-10",
            lg: "px-8 py-12",
          })}
        >
          <p
            className={cls("text-sm text-gray-400", {
              md: "text-base",
            })}
          >
            Built with ❤️ using unplugin-tw-classname
          </p>
          <p
            className={cls("text-xs text-gray-500 mt-2", {
              md: "text-sm mt-3",
            })}
          >
            MIT License © 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

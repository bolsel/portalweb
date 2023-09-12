import clsx from 'clsx';

export default function Details({ data }) {
  return (
    <div className="mt-[80px]">
      {data.informations.length
        ? data.informations.map((d, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-4 even:bg-gray-100 even:rounded-xl p-4 mb-4"
            >
              <h2 className="font-lora font-bold text-[32px] text-center text-blue-gray-800 mb-4 sm:max-w-xl">
                {d.title}
              </h2>
              <section
                className={clsx({
                  ' grid grid-cols-1 min-w-0 w-full': true,
                })}
              >
                <ul
                  className={clsx({
                    'grid grid-cols-1 gap-4': true,
                    'sm:grid-cols-2': true,
                  })}
                >
                  {(d.items ?? []).map((item, i) => (
                    <li
                      key={i}
                      className="grid grid-cols-[10px,auto] gap-4 bg-primary-50/50 rounded-xl p-4 font-lato text-sm text-blue-gray-900 w-full"
                    >
                      <svg
                        height="10"
                        width="10"
                        className="min-w-[10px] mt-[7px] text-primary"
                      >
                        <circle cx="5" cy="5" r="5" fill="currentColor" />
                      </svg>
                      <p className="leading-6">{item.value}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          ))
        : null}
    </div>
  );
}

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { IUICreateCustomizableDefine, UICreateCustomizable } from '../create';

function SelectPage({ page, setPage, totalPage }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className=" drop-shadow-xl relative  min-w-[50px]"
    >
      <motion.button
        disabled={totalPage === 0}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="join-item relative w-full flex items-center justify-center px-3 h-8 text-sm font-medium btn btn-outline btn-sm"
      >
        {page}
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute w-full bg-white flex flex-col max-h-[200px] overflow-auto select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
            }}
            transition={{
              opacity: { duration: 0.5, ease: 'backOut' },
            }}
          >
            {[...Array(totalPage)].map((v, index) => {
              const _i = index + 1;
              return (
                <motion.li
                  className={clsx(
                    'cursor-default text-xs text-center hover:bg-primary/30 py-2 rounded-none',
                    {
                      'bg-primary/30': _i === page,
                    }
                  )}
                  key={index}
                  onClick={() => {
                    setPage(index + 1);
                    setIsOpen(false);
                  }}
                >
                  {index + 1}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export type UIPaginationType = IUICreateCustomizableDefine<{
  total: number;
  page: number;
  limit: number;
  setLimit: any;
  setPage: any;
  customPerPages?: number[];
}>;

const UIPagination: UIPaginationType['returnType'] = (props) => {
  return UICreateCustomizable<UIPaginationType>({
    props,
    defaults: {},
    Component({ total, page, limit, setLimit, setPage }) {
      const total_pages = Math.ceil(total / limit);
      return (
        <div className="font-lora w-full border-t-2 border-t-primary-base p-2 ">
          <div className="flex flex-col items-center">
            <div className="text-sm mb-2">
              Total data{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {total}
              </span>{' '}
            </div>
            <div className="join">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="btn font-medium btn-outline btn-sm join-item"
              >
                <svg
                  className="w-3.5 h-3.5 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5H1m0 0 4 4M1 5l4-4"
                  />
                </svg>
              </button>
              <SelectPage
                totalPage={total_pages}
                page={page}
                setPage={setPage}
              />
              <button
                disabled={page === total_pages || total_pages === 0}
                onClick={() => setPage(page + 1)}
                className="btn font-medium btn-outline btn-sm join-item"
              >
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default UIPagination;

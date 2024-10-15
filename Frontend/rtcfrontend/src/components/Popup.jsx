import React, { useEffect, useRef } from "react";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Input,
  Field,
  Label,
  Description,
} from "@headlessui/react";
import { Badge } from "./Common/Tags";

function Popup({ popup, hidePopup }) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({
    responseComplete: false,
    status: 0,
    message: "",
  });
  console.log(":AA,", popup);
  const { showPopup, data } = popup;

  const emailIdRef = useRef(null);
  const pwdRef = useRef(null);

  const HandleSubmit = () => {
    setLoading(true);
    console.log(data.title);
    const userData = {
      emailId: emailIdRef.current.value,
      password: pwdRef.current.value,
    };
    data.callback(userData).then((data) => {
      console.log("popup : ", data);
      setLoading(false);
      if (data != undefined && data.status == 200) {
        hidePopup();
      } else {
        setResponse({
          responseComplete: true,
          status: data.status,
          message: data.data.message,
        });
        // setError(data.data.message);
      }
    });
  };

  return (
    <Dialog
      open={showPopup}
      onClose={() => {
        hidePopup();
      }}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm  data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <form>
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 text-black">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <DialogTitle
                      as="h3"
                      className=" font-semibold leading-6 text-gray-900 text-xl underline"
                    >
                      Hi! {data.title}
                    </DialogTitle>
                    <div>
                      <div className="mt-2 w-full">
                        <input
                          required
                          ref={emailIdRef}
                          placeholder="Email Id"
                          className="w-full py-1 px-2 text-black border-gray-400 border-solid border-2 rounded-sm h-9"
                        />
                      </div>
                      <div className="mt-2 w-full">
                        <input
                          required
                          ref={pwdRef}
                          placeholder="Pwd"
                          type="password"
                          className="w-full py-1 px-2 text-black border-gray-400 border-solid border-2 rounded-sm h-9"
                        />
                      </div>
                      {response.responseComplete && (
                        <div className="mt-2 w-full">
                          <Badge
                            text={response.message}
                            type={response.status >= 400 ? "error" : "success"}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-2 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={HandleSubmit}
                  type="submit"
                  disabled={loading}
                  className="ml-2 mt-3 w-5 inline-flex justify-center rounded-md bg-white px-3 py-2 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  {!loading ? (
                    data.actionBtnText
                  ) : (
                    <div
                      role="status"
                      className="w-12 flex justify-center items-center"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default Popup;

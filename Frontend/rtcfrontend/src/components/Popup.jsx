import React, { useEffect } from "react";

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

function Popup({ showPopup, hidePopup }) {
  // useEffect(() => {
  //   console.log(show, "AVI");
  //   setOpen(show);
  // }, [show]);

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
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 text-black">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <DialogTitle
                    as="h3"
                    className=" font-semibold leading-6 text-gray-900 text-xl underline"
                  >
                    Hi! Please Sign In
                  </DialogTitle>
                  <div>
                    <div className="mt-2 w-full">
                      <input
                        placeholder="Email Id"
                        className="w-full py-1 px-2 text-black border-gray-400 border-solid border-2 rounded-sm h-9"
                      />
                    </div>
                    <div className="mt-2 w-full">
                      <input
                        placeholder="Pwd"
                        type="password"
                        className="w-full py-1 px-2 text-black border-gray-400 border-solid border-2 rounded-sm h-9"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-2 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="ml-2 mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Log In
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default Popup;

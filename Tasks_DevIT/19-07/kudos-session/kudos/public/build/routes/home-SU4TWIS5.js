import {
  Layout,
  require_auth,
  require_node
} from "/build/_shared/chunk-NN6R6NJZ.js";
import {
  useLoaderData
} from "/build/_shared/chunk-TLNIYIU7.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import "/build/_shared/chunk-7M6SC7J5.js";
import {
  createHotContext
} from "/build/_shared/chunk-25ZDSYBP.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// empty-module:../components/utils/user.server
var require_user = __commonJS({
  "empty-module:../components/utils/user.server"(exports, module) {
    module.exports = {};
  }
});

// app/routes/home.tsx
var import_node = __toESM(require_node(), 1);
var import_auth = __toESM(require_auth(), 1);

// app/components/user-circle.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/user-circle.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/user-circle.tsx"
  );
  import.meta.hot.lastModified = "1721576363149.5918";
}
function UserCircle({
  profile,
  onClick,
  className
}) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      onClick?.(event);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `${className} cursor-pointer bg-gray-400 rounded-full flex justify-center items-center`, onClick, onKeyDown: handleKeyDown, role: "button", tabIndex: 0, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { children: [
    profile.firstName.charAt(0).toUpperCase(),
    profile.lastName.charAt(0).toUpperCase()
  ] }, void 0, true, {
    fileName: "app/components/user-circle.tsx",
    lineNumber: 34,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/user-circle.tsx",
    lineNumber: 33,
    columnNumber: 10
  }, this);
}
_c = UserCircle;
var _c;
$RefreshReg$(_c, "UserCircle");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/user-panel.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/user-panel.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/user-panel.tsx"
  );
  import.meta.hot.lastModified = "1721576150646.7275";
}
function UserPanel({
  users
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "w-1/6 bg-gray-200 flex flex-col", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "text-center bg-gray-300 h-20 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h2", { className: "text-xl text-blue-600 font-semibold", children: "My Team" }, void 0, false, {
      fileName: "app/components/user-panel.tsx",
      lineNumber: 29,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/user-panel.tsx",
      lineNumber: 28,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex-1 overflow-y-scroll py-4 flex flex-col gap-y-10", children: users.map((user) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(UserCircle, { profile: user.profile, className: "h-24 w-24 mx-auto flex-shrink-0" }, user.id, false, {
      fileName: "app/components/user-panel.tsx",
      lineNumber: 32,
      columnNumber: 28
    }, this)) }, void 0, false, {
      fileName: "app/components/user-panel.tsx",
      lineNumber: 31,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "text-center p-6 bg-gray-300", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { type: "submit", className: "rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1", children: "Sign Out" }, void 0, false, {
      fileName: "app/components/user-panel.tsx",
      lineNumber: 35,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/user-panel.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/user-panel.tsx",
    lineNumber: 27,
    columnNumber: 10
  }, this);
}
_c2 = UserPanel;
var _c2;
$RefreshReg$(_c2, "UserPanel");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/home.tsx
var import_user = __toESM(require_user(), 1);
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/home.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/home.tsx"
  );
  import.meta.hot.lastModified = "1721575869812.9866";
}
function Home() {
  _s();
  const {
    users
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Layout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "h-full flex", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(UserPanel, { users }, void 0, false, {
      fileName: "app/routes/home.tsx",
      lineNumber: 45,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex-1" }, void 0, false, {
      fileName: "app/routes/home.tsx",
      lineNumber: 46,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/home.tsx",
    lineNumber: 44,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/home.tsx",
    lineNumber: 43,
    columnNumber: 10
  }, this);
}
_s(Home, "MeW39Ze1niI63e7IRKhlLtgzewA=", false, function() {
  return [useLoaderData];
});
_c3 = Home;
var _c3;
$RefreshReg$(_c3, "Home");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Home as default
};
//# sourceMappingURL=/build/routes/home-SU4TWIS5.js.map

# Test Plan — SauceDemo

## Scope

I clicked around the app for a bit before writing anything. I'm focusing on the purchase flow — login, browse, add to cart, checkout, confirm. If any of that breaks the user can't really do anything.

What I'm covering:

- Login — first thing the user sees, and some users get locked out or have glitches so there's a few things to check.
- Product catalog (`/inventory.html`) — products show up, sorting works, add to cart works.
- Product detail (`/inventory-item.html`) — click a product, see the right info.
- Cart (`/cart.html`) — items stay there when you navigate, removing works.
- Checkout (three steps) — the form, the summary with prices, and the confirmation page.
- Sidebar menu — logout and reset mostly.

## Test Cases

Priorities:
- 0 = blocker, breaks the main flow
- 1 = critical, breaks something important
- 2 = matters but there's a workaround
- 3 = minor / cosmetic

### Login

| # | Prio | Test Case | User | Expected Result |
|---|---|---|---|---|
| 1 | 0 | Login with valid credentials | `standard_user` | Redirects to `/inventory.html`, 6 products show up |
| 2 | 0 | Login with locked out user | `locked_out_user` | Error message says the user is locked out, stays on login page |
| 3 | 1 | Login with wrong password or empty fields | `standard_user` / empty | Shows the right error message and doesn't let you in |

### Full Flow (E2E)

| # | Prio | Test Case | User | Expected Result |
|---|---|---|---|---|
| 4 | 0 | Full purchase: login → add product → cart → checkout → confirm | `standard_user` | Gets to "Thank you for your order!" page, cart badge resets |

### Catalog

| # | Prio | Test Case | User | Expected Result |
|---|---|---|---|---|
| 5 | 1 | Sort products by price low to high | `standard_user` | First item is Onesie ($7.99), last is Fleece Jacket ($49.99) |

### Cart

| # | Prio | Test Case | User | Expected Result |
|---|---|---|---|---|
| 6 | 1 | Add a product to cart and then remove it | `standard_user` | Badge shows "1" after adding. After removing, badge is gone and cart is empty |
| 7 | 2 | Try to checkout with empty cart | `standard_user` | App lets you go through (feels like a bug), summary shows $0.00 |

### Checkout

| # | Prio | Test Case | User | Expected Result |
|---|---|---|---|---|
| 8 | 0 | Click Continue without filling the form | `standard_user` | Error "First Name is required" |
| 9 | 1 | Check that subtotal, tax and total are correct | `standard_user` | Subtotal = sum of prices, tax is around 8%, total = subtotal + tax |

### Cross-user (problem_user vs standard_user)

| # | Prio | Test Case | User | Expected Result |
|---|---|---|---|---|
| 10 | 2 | Product images are broken | `problem_user` | Images don't load or show wrong ones. With `standard_user` they work fine |
| 11 | 2 | Checkout form doesn't keep the last name | `problem_user` | You type in "Last Name" but it doesn't stay, so you can't finish checkout. Works fine with `standard_user` |

### Navigation

| # | Prio | Test Case | User | Expected Result |
|---|---|---|---|---|
| 12 | 2 | Logout sends you back to login | `standard_user` | Redirects to login page. Going to `/inventory.html` directly doesn't work after that |

## Out of Scope

Things I'm not covering:

- Performance — `performance_glitch_user` makes things slow on purpose but setting up proper perf tests is out of scope here.
- Visual stuff — `visual_user` has layout issues but there's no Figma or design reference to compare against.
- Other browsers — just Chromium, no Firefox/Safari/mobile.
- No real backend so no API testing
- Security — not part of this.
- `error_user` in detail — triggers errors all over the place, I'm just covering the main flows.

## Risk Assessment

What I think is most likely to break:

- Checkout form — already broken for `problem_user`. If it fails nobody can buy.
- Cart state — lives in the browser, can easily get out of sync when navigating around.
- Prices — rounding issues with subtotal/tax/total.
- Login — single entry point, if it breaks the whole app is blocked.
- Sorting — 4 sort options, easy to have comparison bugs.
- Images — `problem_user` already shows broken paths.
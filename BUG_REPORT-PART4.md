# Bug Reports

## 1. Checkout form loses the Last Name field for problem_user

**Severity:** High
**User(s) affected:** `problem_user`
**Environment:** Test

### Steps to Reproduce
1. Login as `problem_user` with password `secret_sauce`
2. Add any product to the cart
3. Go to the cart and click Checkout
4. Fill in First Name, Last Name and Postal Code
5. Look at the Last Name field after typing

### Expected Result
The Last Name field should keep the value you typed, just like First Name and Postal Code do.

### Actual Result
The Last Name field loses its value after you type it. It just goes blank. This makes it impossible to complete the checkout because the form always fails validation saying last name is required.

### Evidence
Found this manually while going through the checkout flow with `problem_user`. You type the last name and it just disappears. Tried it a few times and it always happens. With `standard_user` the same form works fine so its specific to this user.

### Notes
Only affects the last name field, first name and zip work fine. Might be something wrong with how that specific input saves its value.


## 2. All product images are wrong for problem_user

**Severity:** Medium
**User(s) affected:** `problem_user`
**Environment:** Test

### Steps to Reproduce
1. Login as `problem_user` with password `secret_sauce`
2. Go to the inventory page
3. Look at the product images

### Expected Result
Each product should show its own image (backpack shows a backpack, bike light shows a bike light, etc). This is how it works for `standard_user`.

### Actual Result
All 6 products show the same image (the dog one `/static/media/sl-404.168b1cce.jpg`). The names, descriptions and prices are correct, just the images are all wrong.

### Evidence
You can see this just by logging in as `problem_user` and looking at the catalog. Compare with `standard_user` where each product has a different image.

### Notes
The image path has "404" in the name so it looks like it's showing a fallback image. Not a blocker but it looks bad.


## 3. Sorting doesn't work for problem_user

**Severity:** Low
**User(s) affected:** `problem_user`
**Environment:** Test

### Steps to Reproduce
1. Login as `problem_user`
2. On the inventory page, select "Price (low to high)" from the sort dropdown

### Expected Result
Products should reorder by price, cheapest first.

### Actual Result
The dropdown changes but the products stay in the same order. Tried the other sort options too and none of them actually sort anything.

### Evidence
Compared with `standard_user` where sorting works fine. With `problem_user` the order never changes no matter what you pick.

### Notes
Seems like the sort function just doesn't do anything for this user.

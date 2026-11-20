#include <stdio.h>

int isPrime(int n) {
    int j;
    if (n < 2) return 0;

    for (j = 2; j * j <= n; j++) {
        if (n % j == 0) {
            return 0;
        }
    }
    return 1;
}

int main() {
    int n = 100;
    int i;

    for (i = n; i >= 1; i--) {

        if (isPrime(i)) {
            continue; 
        }

        if (i % 3 == 0 && i % 5 == 0) {
            printf("FooBar, ");
        }
        else if (i % 3 == 0) {
            printf("Foo, ");
        }
        else if (i % 5 == 0) {
            printf("Bar, ");
        }
        else {
            printf("%d, ", i);
        }
    }

    return 0;
}

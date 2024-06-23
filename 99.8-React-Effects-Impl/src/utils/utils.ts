export const complexCalculation = (n: number) => {
    const startTime = performance.now();
    console.log("Performing complex numeric calculation...");
    let result = 0;
    for (let i = 1; i <= n; i++) {
        result += n * n * new Date().getTime() * (n - n - 1);
    }

    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`Execution time: ${executionTime} milliseconds`);
    return result;
}
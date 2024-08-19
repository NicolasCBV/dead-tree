# Benchmark

This section is about the benchmark that was made with [Benchmark](https://www.npmjs.com/package/benchmark) library to compare the performance of the AVL tree vs other built-in data structures in Javascript. This was made to let you know when AVL structures are really useful and when you should not use this type of data.

## Settings

The hardware settings were defined inside Google Cloud Platform (GCP), with the following properties:

| Platform | Memory | vCPU | Core | Type |
| :--: | :--: | :--: | :--: | :--: |
| GCP | 8GB | 2vCPU | 1 | E2 Standard |

> **Node.js** was used on **20.16.0** version, but should not impact on the results.

## Iteration strategies

### AVL tree

| ops/sec | Method | Samples | Collection Size | Error Rate |
| :-----: | :----: | :-----: | :-------------: | :---: |
| 409 | javascript iteration protocol | 92 | 2,000 | 0.45% |
| 441 | co-routine iteration - in-order strategy | 91 | 2,000 | 0.37%
| 437 | co-routine iteration - pre-order strategy | 91 | 2,000 | 0.16% |
| 443 | co-routine iteration - post-order strategy | 92 | 2,000 | 0.38% |
| 2.97 | javascript iteration protocol | 12 | 200,000 | 0.33% |
| 3.08 | co-routine iteration - in-order strategy | 12 | 200,000 | 0.20% |
| 3.05 | co-routine iteration - pre-order strategy | 12 | 200,000 | 0.22% |
| 3.03 | co-routine iteration - post-order strategy | 12 | 200,000 | 1.97% |
| 0.25 | javascript iteration protocol | 5 | 2,000,000 | 0.14% |
| 0.26 | co-routine iteration - in-order strategy | 5 | 2,000,000 | 0.13% |
| 0.26 | co-routine iteration - pre-order strategy | 5 | 2,000,000 | 0.19% |
| 0.26 | co-routine iteration - post-order strategy | 5 | 2,000,000 | 0.15% |

### Array

| ops/sec | Method | Samples | Collection Size | Error Rate |
| :-----: | :----:| :-----: | :-------------: | :----: |
| 622,157 | javascript iteration protocol | 97 | 2,000 | 0.28% |
| 6,648 | javascript iteration protocol | 97 | 200,000 | 0.17% |
| 664 | javascript iteration protocol | 94 | 2,000,000 | 0.51% |

As you can see, iteration processes on AVL trees are more heavy, mainly because they do not only iterate through the tree, but also try to find the indicated pattern of nodes with the specified strategy, and this can iterate more than the length of your collection, see [here](iteration) to understand.

The co-routines iteration strategy tends to be slightly better than the Javascript iteration protocol, but when we compare between each other, like in-order or pre-order, it does not make any difference.

## Search

| ops/sec | Samples | Collection Size | Error Rate | Type |
| :-----: | :-----: | :-------------: | :----: | :--: |
| 8,079,239 | 93 | 2,000 | 0.68% | AVL tree |
| 4,527,707 | 94 | 200,000 | 0.65% | AVL tree |
| 3,573,812 | 96 | 2,000,000 | 0.65% | AVL tree |
| 1,234,224 | 91 | 2,000 | 0.20% | Array |
| 338 | 88 | 200,000 | 0.10% | Array |
| 33.53 | 58 | 2,000,000 | 0.17% | Array |

This is where a Dead Tree makes a significant difference. When we are talking about AVLs, the most important advantage of them is their capability to search through millions of items and make sure that no significant impact will happen on your applications. It's not so fair to compare arrays vs AVL trees in this case, but in Vanilla Javascript, this is the most used data structure to search for items, and Dead Tree tries to solve all the issues about it.

## Delete

| ops/sec | Samples | Collection Size | Error Rate | Type |
| :-----: | :-----: | :-------------: | :----: | :--: |
| 48,542 | 94 | 2,000 | 0.74% | AVL tree |
| 502 | 92 | 200,000 | 0.48% | AVL tree |
| 48.73 | 63 | 2,000,000 | 0.26% | AVL tree |
| 21,325,132 | 91 | 2,000 | 0.36% | Array |
| 347 | 91 | 200,000 | 0.14% | Array |
| 34.36 | 60 | 2,000,000 | 0.11% | Array |

The most curious part is when arrays start to reach the same ops/sec as the AVLs. This happens mainly because delete operations have, in the worst case, O(n) of complexity because they need to iterate through the list to map your properties.

If delete operations are common in your application, and you have a large collection of data, AVL trees can be better.

## Insert

| ops/sec | Samples | Collection Size | Error Rate | Type |
| :-----: | :-----: | :-------------: | :----: | :--: |
| 776 | 94 | 2,000 | 0.57% | AVL tree |
| 5.53 | 18 | 200,000 | 1.98% | AVL tree |
| 0.42 | 6 | 2,000,000 | 4.10% | AVL tree |
| 62,993 | 92 | 2,000 | 0.53% | Array |
| 155 | 78 | 200,000 | 1.12% | Array |
| 16.35 | 44 | 2,000,000 | 4.47% | Array |

Insert operations will, always, be more heavy than others structures, mainly because they need to rebalance the subtrees to maintain consistency.

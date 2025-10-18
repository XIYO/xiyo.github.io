---
title: Memory Storage of Literals
description: >-
  Literals are fixed values directly assigned to variables in programming
  languages. This article explores how Java literals are stored and managed in
  memory.
authors:
  - XIYO
  - xiyo
lastModified: 2025-07-27T21:08:36+09:00
published: 2025-07-22T01:56:54+09:00
---
# Memory Storage of Literals

Literals are fixed values directly assigned to variables in programming languages. This article explores how Java literals are stored and managed in memory.

## What are Literals?

Literals are data that appear directly as values in code. For example, the number `10`, string `"Hello"`, and boolean value `true` are all literals. Simply put, literals are the data itself used in code.

Common types of literals include:

- **Integer literals**: `10`, `-42`, `0`, `9999L`
- **Floating-point literals**: `3.14f`, `0.5`
- **Character literals**: `'A'`, `'B'`
- **String literals**: `"Hello"`, `"World"`
- **Boolean literals**: `true`, `false`

## How Literals are Stored

The way literals are stored in memory depends on whether the variable is a primitive type, wrapper class, or string.

### Primitive Variables

When a literal is assigned to a primitive variable, the value is stored directly in the variable's memory space. For example, when the integer literal `10` is assigned to a primitive variable, the value `10` is stored directly in the variable's memory space. This is fast and efficient.

**Code Example:**
```java
public class Main {
    public static void main() {
        int intVal = 3;
    }
}
```

**Memory Diagram:**

[![](https://mermaid.ink/img/pako:eNpVULFOwzAQ_RXrJpCiKHHqNvEIrJ2KGCAMJnabiMSuXEdQomydkNhZ-g8dGOCb2v5DL4lU1JNlv3d67-l8DWRGKuAwL81blgvryP1NqgnWqn5ZWLHMya0oy5kT2etTCh0mPUnhedB1JQurMlcYfXZfJExFodHcPX6F19X1hburQrsHUaJoAJxEh-032f9tjp-_ZP-1O2x_jpvdhU1pORAE4EGlLGZL_EvTtVNwuapUChyhFBYHTnWLOlE7M1vrDLiztfLAmnqRA5-LcoWsXkrh1F0hcPLq3F0K_WjMP1eycMZOh9X1G-w1wBt4B54EfsLoKKaTgMZROGYerIHTkPrJmOIJJ0E8DuKo9eCjT438MGDBiLIwYiyJ6Ii1J9YYgVQ?type=png)](https://mermaid.live/edit#pako:eNpVULFOwzAQ_RXrJpCiKHHqNvEIrJ2KGCAMJnabiMSuXEdQomydkNhZ-g8dGOCb2v5DL4lU1JNlv3d67-l8DWRGKuAwL81blgvryP1NqgnWqn5ZWLHMya0oy5kT2etTCh0mPUnhedB1JQurMlcYfXZfJExFodHcPX6F19X1hburQrsHUaJoAJxEh-032f9tjp-_ZP-1O2x_jpvdhU1pORAE4EGlLGZL_EvTtVNwuapUChyhFBYHTnWLOlE7M1vrDLiztfLAmnqRA5-LcoWsXkrh1F0hcPLq3F0K_WjMP1eycMZOh9X1G-w1wBt4B54EfsLoKKaTgMZROGYerIHTkPrJmOIJJ0E8DuKo9eCjT438MGDBiLIwYiyJ6Ii1J9YYgVQ)

> Primitive variables store bit data directly on the call stack.

### Wrapper Classes and Strings

Wrapper classes (Integer, Double, etc.), which are reference types for primitives, and the String class are stored in a special space called the Constant Pool. If the same value already exists in the constant pool, the existing address is returned to save memory.

**Code Example:**
```java
public class Main {
    public static void main(String[] args) {
        Integer intVal = 3;
        String str = "hello";
    }
}
```

**Memory Diagram:**

[![](https://mermaid.ink/img/pako:eNqFUj1PwzAQ_SvWLQWprfLRtEkGBmBhqIRUxABhMInbRLh25TiCUnWrGBDsLJ34Ax0YQOIftf0POE6b0gLiFMX3rHf37sk3gpBHBHzoUn4bxlhIdHYYMKQiza57Ag9idIQp7Ugc3lwGkOdIgwCuCl4eUSJIKBPOyuqtDm2cMFWcH_W--u3tb1XnkTB5jqkinTBJekSsLny0eP1cPDz94KdSKHJHioT1cvArkbCoAGWya42zVGImTznPtdcQ5XirE00kEZgWI65HsxfTFzT_mCwf39H8ebaYvi0ns7JMa-7oFfPuqK5M_C2eakKhra1WYkIpr_wvv7FczIxqtYNvXlbTSaHvSxmoQp8I9VCRWoxRTgpAxqRPAvBVGmGhXj9gY8XDmeSdIQvBlyIjVRA868XgdzFNFcoGEZbkOMHKfb-8HWB2wfkGkyiRXLSLPdTrqDngj-AOfM-oe47VcK2WYbm22XSqMATfMq2617TUZ7YMt2m49rgK97qrXTcNx2hYjmk7jmdbDWf8BU0T910?type=png)](https://mermaid.live/edit#pako:eNqFUj1PwzAQ_SvWLQWprfLRtEkGBmBhqIRUxABhMInbRLh25TiCUnWrGBDsLJ34Ax0YQOIftf0POE6b0gLiFMX3rHf37sk3gpBHBHzoUn4bxlhIdHYYMKQiza57Ag9idIQp7Ugc3lwGkOdIgwCuCl4eUSJIKBPOyuqtDm2cMFWcH_W--u3tb1XnkTB5jqkinTBJekSsLny0eP1cPDz94KdSKHJHioT1cvArkbCoAGWya42zVGImTznPtdcQ5XirE00kEZgWI65HsxfTFzT_mCwf39H8ebaYvi0ns7JMa-7oFfPuqK5M_C2eakKhra1WYkIpr_wvv7FczIxqtYNvXlbTSaHvSxmoQp8I9VCRWoxRTgpAxqRPAvBVGmGhXj9gY8XDmeSdIQvBlyIjVRA868XgdzFNFcoGEZbkOMHKfb-8HWB2wfkGkyiRXLSLPdTrqDngj-AOfM-oe47VcK2WYbm22XSqMATfMq2617TUZ7YMt2m49rgK97qrXTcNx2hYjmk7jmdbDWf8BU0T910)

> Wrapper classes and strings reference values stored in the constant pool.

## Comparison of Wrapper Classes and Strings

Since wrapper classes and string literals reference addresses in the constant pool, they always reference the same instance even when the same value is created multiple times. In contrast, when objects are created using the `new` keyword, new objects are created in heap memory instead of the constant pool.

**Code Example:**
```java
public class ConstantPoolTest {  
    public static void main(String[] args) {  
        A a = new A();  
        B b = new B();  
  
        System.out.println(a.instanceStr == b.instanceStr);  // true  
        System.out.println(a.instanceStr == b.newStr);       // false  
        System.out.println(a.instanceStr == b.internStr);    // true  
        System.out.println(a.instanceStr.equals(b.newStr));  // true  

        System.out.println(a.instanceInt == b.instanceInt);  // true  
        System.out.println(a.instanceInt == b.newInt);       // false  
        System.out.println(a.instanceInt == b.internInt);    // true  
        System.out.println(a.instanceInt.equals(b.newInt));  // true  
    }  
}  
  
class A {  
    String instanceStr = "instanceStr";  
    Integer instanceInt = 1;  
}  
  
class B {  
    String instanceStr = "instanceStr";  
    String newStr = new String("instanceStr");  
    String internStr = newStr.intern();  

    Integer instanceInt = 1;  
    Integer newInt = new Integer(1);  
    Integer internInt = newInt.intValue();  
}
```
> The `intern()` method finds the same value in the string constant pool and returns its address.

Objects created with literals share the same constant pool address, resulting in 'true' comparisons, while objects created with the `new` keyword are created separately in heap memory, resulting in 'false' comparisons.

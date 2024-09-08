export const LANGUAGE_VERSIONS = {
  C: { key: "c", version: "10.2.0" },
  "C++": { key: "cpp", version: "10.2.0" },
  Java: { key: "java", version: "15.0.2" },
  JavaScript: { key: "javascript", version: "18.15.0" },
  Python: { key: "python", version: "3.10.0" },
};

export const BOILERPLATE = {
  "print-attack": {
    python: `def attack_monster(str):
    # Your code here
    # Hint: Loop through each character in "attack" and print it
    
str = "attack"
attack_monster(str)`,
    c: `#include <stdio.h>

void attack_monster(string str) {
    // Your code here
    // Hint: Loop through each character in "attack" and print it
}

int main() {
    string str = "attack";
    attack_monster(str);
    return 0;
}`,
    cpp: `#include <iostream>
#include <string>
using namespace std;

void attack_monster(string str) {
    // Your code here
    // Hint: Loop through each character in "attack" and print it
}

int main() {
    string str = "attack";
    attack_monster();
    return 0;
}`,
    java: `public class MonsterAttack {
    public static void attackMonster(String str) {
        // Your code here
        // Hint: Loop through each character in "attack" and print it
    }

    public static void main(String[] args) {
        String str = "attack";
        attackMonster(str);
    }
}`,
    javascript: `function attackMonster(str) {
    // Your code here
    // Hint: Loop through each character in "attack" and print it
}

// Call the function
let str="attack";
attackMonster();`,
  },

  "reverse-spell": {
    python: `def reverse_spell(spell):
    # Your code here
    # Hint: Reverse the string "tloberif" to get "firebolt"
    
spell = "tloberif"
reversed_spell = reverse_spell(spell)
print(reversed_spell)`,

    c: `#include <stdio.h>
#include <string.h>

void reverse_spell(char str[]) {
    // Your code here
    // Hint: Reverse the string "tloberif" to get "firebolt"
}

int main() {
    char spell[] = "tloberif";
    reverse_spell(spell);
    return 0;
}`,

    cpp: `#include <iostream>
#include <algorithm>
#include <string>
using namespace std;

void reverse_spell(string &str) {
    // Your code here
    // Hint: Reverse the string "tloberif" to get "firebolt"
}

int main() {
    string spell = "tloberif";
    reverse_spell(spell);
    cout << spell;
    return 0;
}`,

    java: `public class ReverseSpell {
    public static String reverseSpell(String spell) {
        // Your code here
        // Hint: Reverse the string "tloberif" to get "firebolt"
        return "";
    }

    public static void main(String[] args) {
        String spell = "tloberif";
        String reversedSpell = reverseSpell(spell);
        System.out.println(reversedSpell);
    }
}`,

    javascript: `function reverseSpell(spell) {
    // Your code here
    // Hint: Reverse the string "tloberif" to get "firebolt"
}

// Call the function
let spell = "tloberif";
let reversedSpell = reverseSpell(spell);
console.log(reversedSpell);`,
  },

  "sort-ingredients": {
    python: `def sort_ingredients(ingredients, potency):
    # Your code here
    # Hint: Sort ingredients based on potency in descending order
    
ingredients = ["dragon scale", "rabbit ear", "eagle nose"]
potency = {"dragon scale": 17, "rabbit ear": 12, "eagle nose": 15}
sorted_ingredients = sort_ingredients(ingredients, potency)
print(sorted_ingredients)`,

    c: `#include <stdio.h>
#include <string.h>

void sort_ingredients(char ingredients[][20], int potency[], int n) {
    // Your code here
    // Hint: Sort ingredients based on potency in descending order
}

int main() {
    char ingredients[3][20] = {"dragon scale", "rabbit ear", "eagle nose"};
    int potency[3] = {17, 12, 15};
    sort_ingredients(ingredients, potency, 3);
    return 0;
}`,

    cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

void sort_ingredients(vector<string> &ingredients, vector<int> &potency) {
    // Your code here
    // Hint: Sort ingredients based on potency in descending order
}

int main() {
    vector<string> ingredients = {"dragon scale", "rabbit ear", "eagle nose"};
    vector<int> potency = {17, 12, 15};
    sort_ingredients(ingredients, potency);
    for (auto &ingredient : ingredients) {
        cout << ingredient << " ";
    }
    return 0;
}`,

    java: `import java.util.*;

public class SortIngredients {
    public static void sortIngredients(List<String> ingredients, Map<String, Integer> potency) {
        // Your code here
        // Hint: Sort ingredients based on potency in descending order
    }

    public static void main(String[] args) {
        List<String> ingredients = Arrays.asList("dragon scale", "rabbit ear", "eagle nose");
        Map<String, Integer> potency = new HashMap<>();
        potency.put("dragon scale", 17);
        potency.put("rabbit ear", 12);
        potency.put("eagle nose", 15);
        sortIngredients(ingredients, potency);
        System.out.println(ingredients);
    }
}`,

    javascript: `function sortIngredients(ingredients, potency) {
    // Your code here
    // Hint: Sort ingredients based on potency in descending order
}

// Call the function
const ingredients = ["dragon scale", "rabbit ear", "eagle nose"];
const potency = {
  "dragon scale": 17,
  "rabbit ear": 12,
  "eagle nose": 15
};

const sortedIngredients = sortIngredients(ingredients, potency);
console.log(sortedIngredients);`,
  },
};

// "language": "c",
//         "version": "10.2.0",
//         "aliases": [
//             "gcc"
//         ],
//         "runtime": "gcc"

// {
//     "language": "c++",
//     "version": "10.2.0",
//     "aliases": [
//         "cpp",
//         "g++"
//     ],
//     "runtime": "gcc"
// },

// {
//     "language": "java",
//     "version": "15.0.2",
//     "aliases": []
// }

// {
//     "language": "javascript",
//     "version": "18.15.0",
//     "aliases": [
//         "node-javascript",
//         "node-js",
//         "javascript",
//         "js"
//     ],
//     "runtime": "node"
// },

// {
//     "language": "python",
//     "version": "3.10.0",
//     "aliases": [
//         "py",
//         "py3",
//         "python3",
//         "python3.10"
//     ]
// },

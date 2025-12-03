// Given an array of objects and two keys “on” and “who”, aggregate the “who” values on the “on” values.

const endorsements = [
  { skill: "css", user: "Bill" },
  { skill: "javascript", user: "Chad" },
  { skill: "javascript", user: "Bill" },
  { skill: "css", user: "Sue" },
  { skill: "javascript", user: "Sue" },
  { skill: "html", user: "Sue" },
];

// const aggregate = (arr, on, who) => {
//   const agg = arr.reduce((a, b) => {
//     const onValue = b[on];
//     const whoValue = b[who];
//     if (a[onValue]) {
//       a[onValue] = {
//         [on]: onValue,
//         [who]: [...a[onValue][who], whoValue],
//       };
//     } else {
//       a[onValue] = {
//         [on]: onValue,
//         [who]: [whoValue],
//       };
//     }
//     return a;
//   }, {});
//   return Object.values(agg);
// };
// console.log(aggregate(endorsements, "skill", "user"));
const aggregateFun = (Arr, skill, user) => {
  const agg = Arr.reduce((ans, curr) => {
    const on = curr[skill];
    const who = curr[user];
    if (ans[on]) {
      ans[on] = {
        [skill]: on,
        [user]: [...ans[on][user], who],
      };
    } else {
      ans[on] = {
        [skill]: on,
        [user]: [who],
      };
    }
    return ans;
  }, {});
  console.log(agg);
  return Object.values(agg);
};
console.log(aggregateFun(endorsements, "skill", "user"));

// 2nd solution
function fun(obj) {
  const ans = {};
  obj.reduce((acc, curr) => {
    if (ans.hasOwnProperty(curr.skill)) {
      ans[curr.skill] = {
        ...ans[curr.skill],
        user: [...ans[curr.skill].user, curr.user],
      };
    } else {
      ans[curr.skill] = { skill: curr.skill, user: [curr.user] };
    }
  }, obj[0]);
  return Object.values(ans);
}

const endorsements2 = [
  { skill: "css", user: "Bill" },
  { skill: "javascript", user: "Chad" },
  { skill: "javascript", user: "Bill" },
  { skill: "css", user: "Sue" },
  { skill: "javascript", user: "Sue" },
  { skill: "html", user: "Sue" },
];
console.log(fun(endorsements2));

# 第六/七周学习报告

### 数据结构的学习

#### 一. 数组

数组还要怎么学`int a[n]`小学生都会.

#### 二.链表

如果要储存未知学生数量的信息怎么办？开一个10000大小的数组？万一人数高于这个呢，岂不是装不下；万一少于这个呢，岂不是浪费空间。我们是否可以像链条一样去随心所欲地更改数据的延长缩短？可以的，使用链表。

我们可以定义一个结构体，然后里面放着下一个结构体的指针，每一个结构体如此，不就像链条一样把所有数据连起来了吗，想要访问数据只需要给出链条的头部，一牵动，所有数据就可见了。

下面使用C语言详细地手搓一个链表用以记录学生呢信息。

```c
#include<stdio.h>
#include<string.h>
#include<stdlib.h>
//设置一个结构体作为链表的一个节点
struct student{
	char name[10];
	struct student* next;
};
//重命名结构体名称
typedef struct student stu;
int main(){
    //p是用于访问的结构体指针相当于扳手
	//head是链表的头部，你可以把它用作链表的名字
    //tail是链表的尾部，next为NULL
    stu *p,*head,*tail;
    //赋予p地址的实际意义，也就是给它一个结构体空间
	p=(stu*)malloc(sizeof(stu));
    //借用p去实现链表头部和尾部，此时是同一个
	p->next=NULL;
	head=p;
	tail=p;
	//开始读入数据
	for(int i=0;i<5;i++){
        //重新给扳手p空间，相当于创建一个链节
		p=(stu*)malloc(sizeof(stu));
		scanf("%s",&p->name);
        //把尾部指向p
		tail->next=p;
        //把tail的地址修改为p的
		tail=p;
        //访问地址上的next并且修改它
		tail->next=NULL;
	}
	/*只要有head，就可以连续去访问数据直到找不到下一个结构体*/
	p=head->next;
	while(p!=NULL){
		printf("姓名:%s\n",p->name);
		p=p->next;
	}
	
    return 0;
}
```

现在已经学废了链表的创建和写入数据以及访问输出，下面试试链表的插入和删除

```c
//链表顺序插入date
int date=3;
p=head;
while(p!=NULL){
    //如果p的下一个节点的值大于了date
	if(p->next->num>date){
        //创建节点
		player* t=   (player*)malloc(sizeof(player)); 
        //赋予节点数据
		t->num=date;
        //新节点指向下一个节点
		t->next=p->next;
        //上一个节点指向新节点
		p->next=t;
		break;
	}
	p=p->next;
}
```

```c
//删除数值为5的节点
	int cmp=5;
	p=head;
	while(p!=NULL){
		if(p->next->num==cmp){
            //保存将要删除的节点便于释放
			player* del=p->next;
            //跳过/删除这个节点
			p->next=p->next->next;
            //释放这个节点的内存
			free(del);
			break;
		}
		p=p->next;
	}
```

#### 三.栈/队列

依鄙人之见识，栈/队列只是一种思想，“栈/队列是一种数据结构"都狭义了。这里只依据数据管理的需求，去应用栈和队列的思想。

1. **栈Stack**

   只在一端进行进出操作的数据结构（像弹匣？）

   下面可以利用数组实现这一思想

   ```c
   int StackDate[100];
   int top=-1;
   //读入数据，-1时停止
   while(1){
       int num;
       scanf("%d",&num);
       if(num==-1)break;
       StackDate[++top]=num;
   }
   while(top>=0){
       printf("%d",StackDate[top--]);
   }
   ```

   这里我们使用top指示顶端，所有的操作都是基于top去执行的，也就限制了数据的操作是基于一端执行的

2. **队列Queue**

   只在两端进行添删数据操作

   同样用数组去实现

   ```c
   int QueueDate[1000];
   int head=1;
   int tail=0;
   //读入数据（-1停止）延长尾部
   while(1){
       int num;
       scanf("%d",&num);
       if(num==-1)break;
       tail++;
       QueueDate[tail]=num;
   }
   //添加数据
   {
       tail++;
       scanf("%d",&Queue[tail]);
   }
   //删除数据
   {
       head++;
   }
   ```

   用head去指示队列顶端，用tail去指示尾部，tail=0代表没有数据，进队只能在尾部执行，出队只能在顶部执行。所有数据操作基于head和tail。(怎么和链表莫名其妙相似?)
   
   **ps：**c++里有用于栈和队列的函数

#### 四.树

一种非线性的，不仅包括数据也包括数据间关系的数据结构，它有下面的一些特征：

![image-20241207153452668](./articles/images/image-20241207153452668.png)

1. 结点：装着数据信息的基本单元，如上图的A1,A2...
2. 结点的度：结点的分支数
3. 树的度：所有结点中最大的度
4. 叶子节点：没有往下的分支
5. 二叉树（满二叉树/完全二叉树）
- 二叉树就是说每个节点的度都为2，子树有左右之分
- 满二叉树就是除了最底层以外，所有结点都有俩子树，二叉树除了满二叉树就是完全二叉树

让我们来试试创建一个二叉树，左小右大

```c
#include <stdio.h>
#include <stdlib.h>

// 定义二叉树节点结构体
typedef struct TreeNode {
    int val;                   // 节点存储的值
    struct TreeNode *left;     // 指向左子树的指针
    struct TreeNode *right;    // 指向右子树的指针
} TreeNode;

// 创建新的二叉树节点
TreeNode* createNode(int value) {
    //跟新建链表一样的
    TreeNode *newNode = (TreeNode *)malloc(sizeof(TreeNode));
    newNode->val = value;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

// 递归插入到二叉树
TreeNode* insertNode(TreeNode *root, int value) {
    //总算找到位置可以创建节点啦
    if (root == NULL) {
        return createNode(value);
    }
    //递归找空位子
    if (value < root->val) {
        root->left = insertNode(root->left, value);
    } else {
        root->right = insertNode(root->right, value);
    }
    return root;
}
int main() {
    TreeNode *root = NULL;
    // 插入一些节点构建二叉树
    root = insertNode(root, 5);
    root = insertNode(root, 3);
    root = insertNode(root, 7);
    root = insertNode(root, 2);
    root = insertNode(root, 4);

    return 0;
}
```

可视化的看看我们生成的树的数据：

![image-20241209175717763](./articles/images/image-20241209175717763.png)

6. 二叉树高度：难以言表，如图所示高度为3。也很好求，如图，元素个数在2 ^ 2~ 2 ^3 之间，所以高度为3。完全二叉树：2^h-1=结点数~为什么不瞪眼法秒了？因为在程序中树数据并不直观~

   [二叉树的逻辑结构和存储结构_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1s54y1U7V3/?p=2&spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=a294db5dc3962df2a489a8e6b1e1fdac)

7. 显然叶子结点数=双分支结点数+1
8. 二叉树可以表示任意的树

试试对二叉树的遍历

模型：

```c
void r(TreeNode* p){
    if(p!=NULL){
        //先序输出
        r(p->Left);
        //中序输出
        r(p->Right);
        //后续输出
    }
}
```

选在想要输出的顺序，在那个位置写上输出or其他遍历操作代码就行

根据上面创建二叉树的代码，补充先序遍历的代码

```c
void print(TreeNode* p){
	if(p!=NULL){
		printf("%d ",p->val);
		print(p->left);
		print(p->right);
	}
}
```

#### 五.堆(未完待续...)

书接上回，堆表现为一个满二叉树，so，可以理解为特殊的二叉树，涉及到的很多操作和上节很相关。

- 堆序性：
  1. 大根堆，父节点大于子节点元素
  2. 小根堆，父节点小于子节点元素
- 基本操作：
  1. 上滤
  2. 下滤

- 相关算法：
  1. 优先队列
  2. 堆排序

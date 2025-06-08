import fetch from 'node-fetch'

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    // 1. ヘッダーから x-netlify-event を取得
    const netlifyEvent = event.headers['x-netlify-event']

    // 2. ボディを JSON パース
    let data
    try {
      data = JSON.parse(event.body)
    } catch (err) {
      console.error('⚠️ JSON parse error:', err)
      return {
        statusCode: 400,
        body: 'Invalid JSON body',
      }
    }

    // 3. 必要なフィールドを抽出
    const {
      id,
      build_id,
      name,
      ssl_url,
      error_message,
      commit_ref,
      branch,
      commit_url,
      published_at,
      committer,
    } = data

    // 4. ログ出力
    console.log('📝 Extracted Fields:', {
      netlifyEvent,
      id,
      build_id,
      name,
      ssl_url,
      error_message,
      commit_ref,
      branch,
      commit_url,
      published_at,
      committer,
    })

    // 成功 or 失敗 メッセージの分岐
    const statusMessage =
      netlifyEvent === 'deploy_created' ? '✅ デプロイが成功しました' : '❌ デプロイが失敗しました'

    const message = `
    ${statusMessage}
    　デプロイ情報:
    　Deploy ID: ${id}
    　Build ID: ${build_id}
    　Netlifyプロジェクト: ${name}
    　URL: ${ssl_url}
    　公開日時: ${published_at}
    　ブランチ: ${branch}
    　コミット: ${commit_ref}
    　コミットURL: ${commit_url}
    　コミッター: ${committer}
    　エラーメッセージ: ${error_message ?? 'なし'}
    `.trim()

    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text: message }),
    })

    return {
      statusCode: 200,
      body: 'Message sent!',
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error: ${error.message}`,
    }
  }
}
